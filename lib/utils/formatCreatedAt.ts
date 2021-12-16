const formatCreatedAt = (_date: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(_date);
    const mo = date.getMonth()
    const day = date.getDate()

    return `${monthNames[mo].slice(0, 3)} ${day}`
}
export default formatCreatedAt;