import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
    margin: 2% auto 5%;
    padding-bottom: 50px;
    border-bottom: 1px solid white;
    
    h4, input {
        margin: 0;
    };

    img {
        height: 85px;
        width: 85px;
        align-self: center;
    }

    form {
        input[type="text"] {
            width: 25%;
        }
    }
`;