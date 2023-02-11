exports.setStatus = (client, status, refresh) => {
    client.user.setStatus(status);
    refresh()
}