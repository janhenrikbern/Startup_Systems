from data_models.base import Base


class User(Base):
    def __init__(self, id, **kwargs):
        super(User, self).__init__("users", id)
        # self.role = role
        # self.email = getattr(kwargs, "email", None)
        self.first_name = getattr(kwargs, "first_name", None)
        self.last_name = getattr(kwargs, "last_name", None)
        self.emissions = getattr(
            kwargs, "emissions", 0
        )  # always to the nearest kg as int
        # self.log = getattr(kwargs, "log", {}) # log data, purchase data, favorite offsets, etc

    def get_or_create(self):
        user = self.get()
        if user is None:
            self.create()

        return self

    def new_emission(self, value, units):
        v = value if units == "kg" else value / 2.2
        v = round(v)
        self.emissions += int(v)
        self.save("emissions")
