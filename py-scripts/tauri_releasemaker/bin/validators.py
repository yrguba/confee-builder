def git_url_validate(url):
    check_github_url = url.find('github')
    check_gitlab_url = url.find('gitlab')
    print(check_gitlab_url)
    if check_github_url != -1 or check_gitlab_url != -1:
        return True
    return False

