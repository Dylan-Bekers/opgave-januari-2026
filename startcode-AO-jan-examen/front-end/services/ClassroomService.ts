const createClassroom = async (name: string) => {
    // call back-end create endpoint (vraag e)
    const res = await fetch (process.env.NEXT_PUBLIC_API_URL + '/classrooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (res.status === 409) throw new Error('CLASSROOM_EXISTS');
    if (!res.ok) throw new Error('CREATE_FAILED');

    return res.json();
};


export default {
    createClassroom,
};