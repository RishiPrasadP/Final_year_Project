from dataclasses import dataclass


@dataclass
class PaginationParams:
    page: int = 1
    page_size: int = 20

    @property
    def skip(self) -> int:
        return (self.page - 1) * self.page_size
