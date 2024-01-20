from setuptools import find_packages, setup
from src.config import config

setup(
    name=config["app"]["name"],
    version=config["app"]["version"],
    license="MIT",
    author="edcilo",
    author_email="me@edcilo.com",
    url="https://edcilo.com",
    description="Devices Service",
    package_dir={"": "src"},
    packages=find_packages(where="src"),
    python_requires=">=3.9",
)
