import  {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export default forwardRef((props: ICellRendererParams, ref) => {
    const imageForMood = (make: string) =>
        'https://www.ag-grid.com/example-assets/smileys/' +
        (make === 'Porsche' ? 'happy.png' : 'sad.png');

    const [mood, setMood] = useState(imageForMood(props.value));

    useImperativeHandle(ref, () => {
        return {
            refresh(params: ICellRendererParams) {
                setMood(imageForMood(params.value));
            },
        };
    });

    return <span>{props.value}<img width="20px" src={mood} style={{ paddingLeft: '5px' }} alt="mood"/></span>;
});