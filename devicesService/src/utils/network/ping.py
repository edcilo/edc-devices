import os


def ping(hostname: str) -> bool:
    """
    Ping a hostname

    :param hostname: hostname to ping

    :return: True if the hostname is reachable, False otherwise
    """
    response = os.system("ping -c 1 " + hostname)
    return response == 0
