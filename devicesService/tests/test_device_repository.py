from src.repositories.deviceRepository import DeviceRepository

repo = DeviceRepository()


def test_get_all():
    devices = repo.get_all()
    assert len(devices) > 0


def test_get_by_id():
    device = repo.get_by_id(1)
    assert device.id == 1


def test_create():
    device = repo.create({"name": "Test", "ip": "127.0.0.1"})
    assert device.id is not None


def test_update():
    device = repo.create({"name": "Test", "ip": "127.0.0.1"})
    original_name = device.name
    updated = repo.update(device.id, {"name": "Updated"})
    assert original_name != updated.name


def test_delete():
    device = repo.create({"name": "To Delete", "ip": "127.0.0.1"})
    repo.delete(device.id)
    device = repo.get_by_id(device.id)
    assert device is None
