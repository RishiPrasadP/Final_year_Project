from enum import StrEnum


class UserRole(StrEnum):
    CLIENT = 'client'
    LAWYER = 'lawyer'
    JUDGE = 'judge'
    ADMIN = 'admin'
