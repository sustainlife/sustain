import 'bootstrap/dist/css/bootstrap.min.css';
import './Emissions.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UseTotalContext } from '../hocs/states';

function AddTotalEmissions() { 

  const { setTotal, addBusTotal, addRailTotal, getAllCalculationComponent } = UseTotalContext();
 
  const handleClick=(e)=>{
    const request = getAllCalculationComponent();
    axios
        .post('https://api.sustain.life/community/v1/personal-calculator/total',
        request,
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc",
          'content-type': 'application/json'
         }})
        .then(res => {
          setTotal(res.data.totalEmissionsCO2e); 
          addBusTotal(res.data.totalBusEmissionsCO2e); 
          addRailTotal(res.data.totalRailEmissionsCO2e); 
        })
        .catch(err => {
            console.log(err)
        })
  };

  return (
    <>
    <div class="container text-center" style={{width: '1000px', padding:'5px'}}>
      <h4 className="text-warning">Calculate your total emissions</h4>
      <br></br>
      <table className='m-auto'>

        <tr className='row'>
          <td className='col-md-3'>
            <Button  variant="warning" style={{width: '200px'}}  onClick={handleClick}>
              Calculate Total
            </Button>
          </td>
          <td className='col-md-9'>
          </td>
        </tr>

      </table>
      </div>
    </>
  );
}

export default AddTotalEmissions;