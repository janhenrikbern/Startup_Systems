from data_models.base import Base
class User(Base):
    def __init__(self, id, **kwargs):
        super(User, self).__init__('users', id)
        # self.role = role
        # self.email = getattr(kwargs, "email", None)
        self.first_name = getattr(kwargs, "first_name", None)
        self.last_name = getattr(kwargs, "last_name", None)
        self.emissions = getattr(kwargs, "emissions", 0) # always to the nearest kg as int
        self.log = getattr(kwargs, "log", {}) # log data, purchase data, favorite offsets, etc

    