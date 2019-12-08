import styled from 'styled-components';

export default styled.div`
    width: 50vw;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid white;

    a {
        display: flex;
        flex-direction: column;
        align-self: center;
        margin-top: 35px;

        h3 {
            order: -1;
        }

        img {
            height: 400px;
            width: 400px;
            align-self: center;
        }
    }
`;