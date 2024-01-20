from src.repositories.userRepository import UserRepository

repo = UserRepository()


def test_get_all():
    users = repo.get_all()
    assert len(users) > 0


def test_get_by_id():
    user = repo.get_by_id(1)
    assert user.id == 1


def test_check_password():
    user = repo.create({"email": "john.doe@example.com", "password": "secret"})
    valid = repo.check_password(user.id, "secret")
    invalid = repo.check_password(user.id, "invalid")
    assert valid is True
    assert invalid is False


def test_create():
    user = repo.create({"email": "john.doe@example.com", "password": "secret"})
    assert user.id is not None
    assert user.password != "secret"


def test_update():
    user = repo.create({"email": "john.doe@example.com", "password": "secret"})
    original_email = user.email
    updated = repo.update(
        user.id, {"email": "jane.doe@example.com", "password": "updated"}
    )
    assert original_email != updated.email
    assert updated.password != "updated"


def test_delete():
    user = repo.create({"email": "john.doe@example.com", "password": "secret"})
    repo.delete(user.id)
    user = repo.get_by_id(user.id)
    assert user is None
