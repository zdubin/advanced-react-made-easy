import React from 'react';
import './ProtoTest.scss';

const  PlaceHolder: React.FC = (): JSX.Element => {
    function test()
    {
    }

    test.prototype.cusip = '';
    test.prototype.value = 0;
    test.prototype.couponDate = 'N/A';
    test.prototype.couponAmount = 'N/A';

    // @ts-ignore
    const newTestObj = new test();
    newTestObj.cusip = '12345';
    newTestObj.value = 55.55;


    console.log(newTestObj)
    return  <div className='row'>
        <div className='col-12'>
            <div className='curved-edges w-100 proto-test__section'>
            <h4>newTestObj fields/values</h4>
        {JSON.stringify(newTestObj)}
                <hr/>
        <h4>Inherited or override values:</h4>
        <div>Cusip: {newTestObj.cusip}</div>
        <div>Value: {newTestObj.value}</div>
        <div>couponDate: {newTestObj.couponDate}</div>
        <div>couponAmount {newTestObj.couponAmount}</div>
            </div>
        </div>
    </div>;
}
export default PlaceHolder;