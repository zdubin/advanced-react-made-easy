import React, {useContext, useState} from 'react';
import { UserContext} from "../App";
import {UserType} from '../AppTypes/AppTypes';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import useFetch from "../CustomHooks/useFetch";
import Button from "@mui/material/Button";
import './PlaceHolder.scss';

const colors: string[] = ['lavender','red', 'blue', 'green', 'yellow', 'grey','blueviolet','coral']
const PlaceHolder: React.FC = (): JSX.Element =>
{
    const [iteration, setIteration] = useState<number>(0);

    const calcValues = useSelector((state: RootState) => state.calc);
    const url:string = 'https://www.anapioficeandfire.com/api/books';
    const [data] = useFetch(url,iteration);

    const { name } = useContext<UserType>(UserContext);

    return <div >
                <h3>Result : {calcValues?.total}</h3> 
                <h2>Users :{name}: placeholder</h2>
        <h4>Iteration: {iteration}</h4>
        <Button  variant="contained" onClick={() => setIteration(iteration+1 )} style={{marginBottom: '5px',marginLeft: '2px'}}>
            Force Call
        </Button>
        <div className="curved-edges place-holder__section" style={{ backgroundColor: colors[iteration % colors.length]}}>
        <ol >
                {data?.map(({name}, i) => <li key={`ph-${i}`}>{name}</li>)}
        </ol>
        </div>
            </div>
}
export default PlaceHolder;