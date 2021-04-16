"""
Unittests for API methods
"""
import unittest
import data_models


class TestDataModels(unittest.TestCase):
    def test_users(self):
        print(data_models.User("test_id").serialize())
        assert True


if __name__ == "__main__":
    unittest.main()
