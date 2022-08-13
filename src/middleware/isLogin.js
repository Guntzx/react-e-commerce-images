import Cookies from 'universal-cookie';

const isLogged = () => {
    const cookies = new Cookies()
    const token = cookies.get('access-token')

    if(token === undefined || token === null) {
        return false
    }

    return true
}

export default isLogged