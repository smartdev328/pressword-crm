export const parseTeamMemberPermissionsAsStringArray = (member) => {
    const permissionsMap = {
        can_access_call_recordings: "Can Access Call Recordings",
        can_invite_users: "Can Invite Users",
        can_process_billings: "Can Process Billings",
        can_see_all_call_logs: "Can See All Call Logs"
    }
    const permissions = []

    for(let [key, value] of Object.entries(permissionsMap)) {
        if (member[key]) {
            permissions.push(value)
        }
    }

    return permissions
}
