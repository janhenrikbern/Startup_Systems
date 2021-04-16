from data_models import db_util


class Base:
    def __init__(self, table_name, id):
        self.table = table_name
        self.id = id

    def create(self):
        db_util.create_table_entry(self)

    def get(self):
        kwargs = db_util.get_table_entry(self.table, self.id)
        if not kwargs:
            return None

        for k, v in kwargs.items():
            self.__dict__[k] = v
        return self

    def save(self, element):
        """
        Saves updates by update data table entry
        """
        print(element)
        db_util.update_table_entry(self, element)

    def delete(self):
        pass

    def serialize(self):
        return db_util.serialize(self)
