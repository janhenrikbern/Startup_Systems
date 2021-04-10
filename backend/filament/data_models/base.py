from data_models import db_util

class Base:
    def __init__(self, table_name, id):
        self.table = table_name
        self.id = id

    def create(self):
        db_util.create_table_entry(self)

    def get(self):
        kwargs = db_util.get_table_entry(self.table, self.id)
        for k, v in kwargs.item():
            self.__dict__[k] == v
        return self

    def update(self):
        pass

    def delete(self):
        pass

    def serialize(self):
        return db_util.serialize(self)
