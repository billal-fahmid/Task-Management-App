const storeUser = (user, bio) => {
    const currentUser = {
        userName: user.displayName,
        profilePicture: user.photoURL,
        email: user.email,
        bio: bio,
        teamRequest:[],
    }
    fetch(`https://tasks-manage-server-billal-fahmid.vercel.app/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)

    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

export default storeUser;

