import styled from 'styled-components';
export const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
export const Radio = styled.input`
   display: none;
`
export const Rating = styled.div`
   cursor: pointer;
`
import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
const RatingInput = ({value, onChange}: any) => {
    const [rate, setRate] = useState(value);
    return (
        <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label key={index}>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                onChange && onChange(givenRating);
                                setRate(givenRating);
                            }}
                        />
                        <Rating>
                            <FontAwesomeIcon
                              icon={faStar}
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "#0071BC"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    );
};
 
export default RatingInput;