import 'bootstrap/dist/css/bootstrap.min.css';
import './Emissions.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UseTotalContext } from '../hocs/states';

function AddUtilityEmissions() {
    const[utilityCompanyId, setUtilityCompanyId]= useState(0);
    const[zipCode, setZipCode]= useState('') ;
    const[electricalUsage, setElectricalUsage]= useState(0) ;
    const[electricalUsageUnit, setElectricalUsageUnit]= useState('');
    const[naturalGasUsage, setNaturalGasUsage]= useState(0);
    const[naturalGasUsageUnit, setNaturalGasUsageUnit]= useState('');
    const[fuelOilUsage, setFuelOilUsage]= useState(0);
    const[fuelOilUsageUnit, setFuelOilUsageUnit]= useState('');
    const[propaneUsage, setPropaneUsage]= useState(0);
    const[propaneUsageUnit, setPropaneUsageUnit]= useState('');
    const[woodPelletUsage, setWoodPelletUsage]= useState(0);
    const[woodPelletUsageUnit, setWoodPelletUsageUnit]= useState('');
    const[company, setCompany]=useState([]);
    const[electricalUnit, setElectricalUnit]=useState([]);
    const[naturalUnit, setNaturalUnit]=useState([]);
    const[fuelOil, setFuelOil]=useState([]);
    const[propaneUnit, setPropaneUnit]=useState([]);
    const[woodenPellet, setWoodenPellet]=useState([]);
    const[emissionsValue, setEmissionsValue]=useState(0);

    const { addUtilityCalculationComponent, countryIsoCode, addUtilityTotal } = UseTotalContext();

      function fetchCompany() {
        axios
        .get('https://api.sustain.life/community/v1/reference/utility-companies',
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc"
        }})
        .then(res => { 
          setCompany(res.data.items)
        })
        .catch(err => {
            console.log(err)
        })
      };

    useEffect(() => {
        fetchCompany();
      }, []);

    const setVars = (e) => { 
        setUtilityCompanyId(company[e].utilityCompanyId)
        setZipCode(company[e].zipCode)
    }


    function fetchElectricUnits() {
        axios
        .get('https://api.sustain.life/community/v1/reference/electrical-units',
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc"
        }})
        .then(res => { 
          setElectricalUnit(res.data.items)
        })
        .catch(err => {
            console.log(err)
        })
      };

    useEffect(() => {
        fetchElectricUnits();
      }, []);

    
      function fetchNaturalUnits() {
        axios
        .get('https://api.sustain.life/community/v1/reference/natural-gas-units',
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc"
        }})
        .then(res => {
          setNaturalUnit(res.data.items)
        })
        .catch(err => {
            console.log(err)
        })
      };

    useEffect(() => {
        fetchNaturalUnits();
      }, []);


      function fetchFuelOil() {
        axios
        .get('https://api.sustain.life/community/v1/reference/fuel-oil-units',
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc"
        }})
        .then(res => {
          setFuelOil(res.data.items)
        })
        .catch(err => {
            console.log(err)
        })
      };

    useEffect(() => {
        fetchFuelOil();
      }, []);

      function fetchPropaneUnit() {
        axios
        .get('https://api.sustain.life/community/v1/reference/propane-units',
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc"
        }})
        .then(res => {
          setPropaneUnit(res.data.items)
        })
        .catch(err => {
            console.log(err)
        })
      };

    useEffect(() => {
        fetchPropaneUnit();
      }, []);

      function fetchWoodenPellet() {
        axios
        .get('https://api.sustain.life/community/v1/reference/wood-pellet-units',
          { headers: {
          'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc"
        }})
        .then(res => {
          setWoodenPellet(res.data.items)
        })
        .catch(err => {
            console.log(err)
        })
      };

    useEffect(() => {
        fetchWoodenPellet();
      }, []);



    const handleClick=(e)=>{
        const utilities = {utilityCompanyId, zipCode, electricalUsage, electricalUsageUnit, naturalGasUsage, 
            naturalGasUsageUnit, fuelOilUsage, fuelOilUsageUnit, propaneUsage, propaneUsageUnit, woodPelletUsage,
             woodPelletUsageUnit, countryIsoCode} 
        addUtilityCalculationComponent(utilities);
        axios
            .post('https://api.sustain.life/community/v1/personal-calculator/utilities',
            utilities,
              { headers: {
              'Ocp-Apim-Subscription-Key': "5da167febbdf4b04aaea80025aff37cc",
              'content-type': 'application/json'
             }})
            .then(res => {
                setEmissionsValue(res.data.totalUtilityEmissionsCO2e)
                addUtilityTotal(res.data.totalUtilityEmissionsCO2e)
            })
            .catch(err => {
                console.log(err)
            })
      };

    return (
        <> 
        <div class="container text-center" style={{width: '1000px', padding:'5px'}}>
            <h4 className='text-warning'>Calculate your utility emissions.</h4>
            <h6 className="text-warning">You can add how much you spend on each of the following categories.</h6>
            <br></br>
            <table className='m-auto'>
              <tr className='row'>
             <td style={{width: '300px', textAlign: 'left'}}>
                <p>Utility Company name</p>
              </td>
               <td style={{width: '300px', textAlign: 'left'}}>
                  <select onChange={(e)=>setVars(e.target.value)}>
                     <option value=""> Select an option</option>
                      {company.map((company, index) => <option key={`${index}`} value={`${index}`}>{company.utilityName}</option>)}
                  </select>
                </td>
              </tr>

              <tr className='row'>
                <td style={{width: '300px', textAlign: 'left'}}>
                    <p>What is your electricity usage?</p>
                  </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                    <input
                        className='w-100'
                        type="number"
                        value={electricalUsage}
                        onChange={event => {
                            setElectricalUsage(+(event.target.value)); 
                        }}
                        />                    
                    </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                        <select onChange={(e)=>setElectricalUsageUnit(e.target.value)}>
                            <option value=""> Select an option</option>
                            {electricalUnit.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </td>
                </tr>

                <tr className='row'>
                  <td style={{width: '300px', textAlign: 'left'}}>
                    <p>What is your  natural gas usage?</p>
                  </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                    <input
                        className='w-100'
                        type="number"
                        value={naturalGasUsage}
                        onChange={event => {
                          setNaturalGasUsage(+(event.target.value)); 
                        }}
                        />                    
                    </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                        <select onChange={(e)=>setNaturalGasUsageUnit(e.target.value)}>
                            <option value=""> Select an option</option>
                            {naturalUnit.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </td>
                </tr>

                <tr className='row'>
                  <td style={{width: '300px', textAlign: 'left'}}>
                    <p>What is your fuel oil usage?</p>
                  </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                    <input
                        className='w-100'
                        type="number"
                        value={fuelOilUsage}
                        onChange={event => {
                          setFuelOilUsage(+(event.target.value)); 
                        }}
                        />                    
                    </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                        <select onChange={(e)=>setFuelOilUsageUnit(e.target.value)}>
                            <option value=""> Select an option</option>
                            {fuelOil.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </td>
                </tr>

                <tr className='row'>
                  <td style={{width: '300px', textAlign: 'left'}}>
                    <p>What is your propane usage?</p>
                  </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                    <input
                        className='w-100'
                        type="number"
                        value={propaneUsage}
                        onChange={event => {
                          setPropaneUsage(+(event.target.value)); 
                        }}
                        />                    
                    </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                        <select onChange={(e)=>setPropaneUsageUnit(e.target.value)}>
                            <option value=""> Select an option</option>
                            {propaneUnit.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </td>
                </tr>

                <tr className='row'>
                  <td style={{width: '300px', textAlign: 'left'}}>
                            <p>What is your wooden pellet usage?</p>
                   </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                    <input
                        className='w-100'
                        type="number"
                        value={woodPelletUsage}
                        onChange={event => {
                          setWoodPelletUsage(+(event.target.value)); 
                        }}
                        />                    
                    </td>
                   <td style={{width: '300px', textAlign: 'left'}}>
                        <select onChange={(e)=>setWoodPelletUsageUnit(e.target.value)}>
                            <option value=""> Select an option</option>
                            {woodenPellet.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </td>
                </tr>

                <tr className='row'>
                  <td className='col-md-3'>
                    <Button variant="warning" style={{width: '200px'}} type="submit" onClick={handleClick}>
                      Set Emissions
                    </Button>
                  </td>
                  <td className='col-md-9'>
                    {/* {emissionsValue.toFixed(2)} MT C02e */}
                  </td>
                </tr>
            </table>
        </div>
        </>
  );

}

export default AddUtilityEmissions;