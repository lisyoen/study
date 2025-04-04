from fastapi import APIRouter, Depends
from typing import Optional, Dict
from auth.auth import get_user_from_token

router = APIRouter()

@router.get("/")
def read_users(user_info: Dict = Depends(get_user_from_token)):
    return {"message": "사용자 목록 가져오기", "user": user_info}

@router.post("/")
def create_user(name: str, email: str, user_info: Dict = Depends(get_user_from_token)):
    return {"message": "사용자 생성", "name": name, "email": email, "created_by": user_info.username}

@router.get("/{user_id}")
def read_user(user_id: int, user_info: Dict = Depends(get_user_from_token)):
    return {"message": f"사용자 {user_id} 가져오기", "user": user_info}

