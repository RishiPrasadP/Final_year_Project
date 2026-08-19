import re


MOBILE_REGEX = re.compile(r'^\+?[0-9]{10,15}$')


def is_valid_mobile(mobile: str) -> bool:
    return bool(MOBILE_REGEX.match(mobile))
