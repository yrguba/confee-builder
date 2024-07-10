import platform
from github import Github
import requests
from bin.vars import back_domain, github_repo

platform = platform.system()


def start():
    back_endpoint = back_domain + "api/v1/files/upload_releases_from_github"

    g = Github(None)
    repo = g.get_repo(github_repo)
    latest_release_url = repo.get_latest_release().url
    latest_release = requests.get(latest_release_url).json()
    assets = requests.get(latest_release["assets_url"]).json()

    pub_date = latest_release["published_at"]
    version = latest_release["tag_name"]
    win_url = ''
    win_sig = ''
    mac_url = ''
    mac_sig = ''

    for i in assets:
        if i["name"].endswith('.msi.zip'):
            win_url = i['browser_download_url']

        if i["name"].endswith('.msi.zip.sig'):
            win_sig = requests.get(i['browser_download_url']).text

        if i["name"].endswith('.tar.gz'):
            mac_url = i['browser_download_url']

        if i["name"].endswith('.gz.sig'):
            mac_sig = requests.get(i['browser_download_url']).text

    try:
        data = {"win_url": win_url, "win_sig": win_sig, "mac_url": mac_url, "mac_sig": mac_sig, "pub_date": pub_date,
                "version": version}
        res = requests.post(back_endpoint, data=data, verify=False)
        print(res)
        print('success')
    except:
        print('send error')
