from fastapi import FastAPI, HTTPException, Depends, Form,Response, Request, Cookie
from passlib.context import CryptContext
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates  
import jwt
from datetime import datetime, timedelta
import secrets
import uvicorn
from typing import Optional

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

# JWT 토큰을 생성하고 검증할 때 사용하는 보안 키
SECRET_KEY = secrets.token_hex(32)  # 보안 키 자동 생성
print(f"Generated SECRET_KEY: {SECRET_KEY}")  # 콘솔에 출력

# JWT 설정
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 비밀번호 해싱 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# 사용자 저장 (임시 저장소, 실제 환경에서는 DB 사용)
fake_users_db = {}


# 비밀번호 해싱 함수
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# 비밀번호 검증 함수
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# JWT 토큰 생성 함수
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# 로그인 페이지
@app.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


# 회원가입 
@app.post("/register")
async def register(username: str = Form(...), password: str = Form(...)):
    if username in fake_users_db:
        raise HTTPException(status_code=400, detail="이미 존재하는 사용자입니다.")
    
    hashed_password = hash_password(password)
    fake_users_db[username] = {"username": username, "password": hashed_password}
    return RedirectResponse(url="/", status_code=303)  # 회원가입 후 로그인 페이지로 이동


# 로그인
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    user = fake_users_db.get(username)
    
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 잘못되었습니다.")
    
    access_token = create_access_token(
        data={"sub": username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    response = RedirectResponse(url="/dashboard", status_code=303)

    # HTTP-only 쿠키에 토큰 저장
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,  # JavaScript에서 접근 불가
        secure=False,    
        samesite="lax", # CSRF 보호
        max_age=1800    # 30분
    )
    print("access_token:",access_token)  
    return response

# 대시보드 페이지 (JWT 인증 필요)
@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(
    request: Request,
    access_token: Optional[str] = Cookie(None)
):
    print("not access_token",access_token)
    if not access_token:
        return RedirectResponse(url="/", status_code=303)
    
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        
        if username is None or username not in fake_users_db:
            raise HTTPException(status_code=401, detail="인증 실패")

        return templates.TemplateResponse("dashboard.html", {"request": request, "username": username})
    
    except jwt.ExpiredSignatureError:  # 토큰이 만료되었을 때 발생하는 예외
        response = RedirectResponse(url="/", status_code=303)
        response.delete_cookie("access_token")
        return response
    
    except jwt.PyJWTError: # 토큰이 유효하지 않거나 변조되었을 때 발생하는 예외
        response = RedirectResponse(url="/", status_code=303)
        response.delete_cookie("access_token")
        return response

# 로그아웃
@app.get("/logout")
async def logout():
    response = RedirectResponse(url="/", status_code=303)
    response.delete_cookie("access_token")
    return response

# FastAPI 서버 실행
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
