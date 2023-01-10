import { useEffect, useState } from 'react';

const pwd = 'vD0ZgnCfu09O';

const Validation = () => {
    const [isValidated, setIsValidated] = useState(true);
    useEffect(() => {
        const localIsValidated = localStorage.getItem('v1');
        if (localIsValidated == null) {
            localStorage.setItem('v1', false);
            setIsValidated(false);
        } else {
            localIsValidated === 'true'
                ? setIsValidated(true)
                : setIsValidated(false);
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target[0].value === pwd) {
            setIsValidated(true);
            localStorage.setItem('v1', true);
        } else {
            localStorage.setItem('v1', false);
            setIsValidated(false);
            const inputField = document.querySelector('.pwd');
            inputField.value = '';
        }
    };
    return (
        <div
            className='validation'
            style={{
                opacity: isValidated ? 0 : 1,
                pointerEvents: isValidated ? 'none' : 'all',
            }}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    name='password'
                    className='pwd'
                    data-lpignore='true'
                    required
                />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};

export default Validation;
