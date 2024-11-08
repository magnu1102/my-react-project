import React, { useState, useEffect } from 'react';
import defaultProfileImage from '../components/default_pfp.png';
import './KpiInputForm.css';

function KpiInputForm() {
  const [customerData, setCustomerData] = useState(Array(3).fill({ name: '', imageUrl: '', metricValue: '', showCrown: false, flag: "" }));
  const [courierData, setCourierData] = useState(Array(3).fill({ name: '', imageUrl: '', metricValue: '', showCrown: false, flag: "" }));
  const [venueData, setVenueData] = useState(Array(3).fill({ name: '', imageUrl: '', metricValue: '', showCrown: false, flag: "" }));
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [licenseText, setLicenseText] = useState('');
  const defaultValues = { name: 'Name', imageUrl: defaultProfileImage, metricValue: '100.0%' };

  useEffect(() => {
    fetch('/LICENSE.txt')
      .then((response) => response.text())
      .then((text) => setLicenseText(text))
      .catch((error) => console.error('Error loading license:', error));
  }, []);

  const handleInputChange = (category, index, event, setCategory) => {
    const { name, value, type, checked } = event.target;
    const updatedData = [...category];
    updatedData[index] = { ...updatedData[index], [name]: type === 'checkbox' ? checked : value };
    setCategory(updatedData);
  };

  const addEntry = (category, setCategory) => {
    setCategory([...category, { name: '', imageUrl: '', metricValue: '', showCrown: false, flag: "" }]);
  };

  const removeEntry = (category, setCategory) => {
    if (category.length > 1) {
      setCategory(category.slice(0, -1));
    }
  };

  const europeanCountries = [{ name: "No Flag", flag: "" }, { name: "Albania", flag: "🇦🇱" }, { name: "Andorra", flag: "🇦🇩" }, { name: "Austria", flag: "🇦🇹" }, { name: "Belgium", flag: "🇧🇪" }, { name: "Bosnia & Herzegovina", flag: "🇧🇦" }, { name: "Bulgaria", flag: "🇧🇬" }, { name: "Croatia", flag: "🇭🇷" }, { name: "Cyprus", flag: "🇨🇾" }, { name: "Czech Republic", flag: "🇨🇿" }, { name: "Denmark", flag: "🇩🇰" }, { name: "Estonia", flag: "🇪🇪" }, { name: "Finland", flag: "🇫🇮" }, { name: "France", flag: "🇫🇷" }, { name: "Germany", flag: "🇩🇪" }, { name: "Greece", flag: "🇬🇷" }, { name: "Hungary", flag: "🇭🇺" }, { name: "Iceland", flag: "🇮🇸" }, { name: "Ireland", flag: "🇮🇪" }, { name: "Italy", flag: "🇮🇹" }, { name: "Latvia", flag: "🇱🇻" }, { name: "Lithuania", flag: "🇱🇹" }, { name: "Luxembourg", flag: "🇱🇺" }, { name: "Malta", flag: "🇲🇹" }, { name: "Moldova", flag: "🇲🇩" }, { name: "Monaco", flag: "🇲🇨" }, { name: "Montenegro", flag: "🇲🇪" }, { name: "Netherlands", flag: "🇳🇱" }, { name: "North Macedonia", flag: "🇲🇰" }, { name: "Norway", flag: "🇳🇴" }, { name: "Poland", flag: "🇵🇱" }, { name: "Portugal", flag: "🇵🇹" }, { name: "Romania", flag: "🇷🇴" }, { name: "San Marino", flag: "🇸🇲" }, { name: "Serbia", flag: "🇷🇸" }, { name: "Slovakia", flag: "🇸🇰" }, { name: "Slovenia", flag: "🇸🇮" }, { name: "Spain", flag: "🇪🇸" }, { name: "Sweden", flag: "🇸🇪" }, { name: "Switzerland", flag: "🇨🇭" }, { name: "Ukraine", flag: "🇺🇦" }, { name: "United Kingdom", flag: "🇬🇧" }];

  const renderFormSection = (title, categoryData, setCategory) => (
    <div className="form-section">
      <h2>{title}</h2>
      {categoryData.map((data, index) => (
        <div key={index} className="card">
          <h3>Number: {index + 1}</h3>
          <input type="text" name="name" placeholder="Name" value={data.name} onChange={(e) => handleInputChange(categoryData, index, e, setCategory)} />
          <input type="text" name="imageUrl" placeholder="Picture Link" value={data.imageUrl} onChange={(e) => handleInputChange(categoryData, index, e, setCategory)} />
          <input type="text" name="metricValue" placeholder="Metric Value" value={data.metricValue} onChange={(e) => handleInputChange(categoryData, index, e, setCategory)} />
          <label style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', gap: '0.5rem', fontSize: '0.9rem' }}>
            <input type="checkbox" name="showCrown" checked={data.showCrown} onChange={(e) => handleInputChange(categoryData, index, e, setCategory)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            Show Crown
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Flag:
            <select name="flag" value={data.flag} onChange={(e) => handleInputChange(categoryData, index, e, setCategory)} style={{ padding: '0.4rem', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ccc', marginTop: '0.25rem', cursor: 'pointer' }}>
              {europeanCountries.map((country) => (
                <option key={country.name} value={country.flag}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <div className="button-group">
        <button className="add-button" onClick={() => addEntry(categoryData, setCategory)}>Add Row</button>
        <button className="remove-button" onClick={() => removeEntry(categoryData, setCategory)}>Remove Row</button>
      </div>
    </div>
  );

  const generateHtmlTemplate = () => {
    const renderEntries = (entries) =>
      entries.map((entry) => {
        const name = entry.name || defaultValues.name;
        const imageUrl = entry.imageUrl || defaultValues.imageUrl;
        const metricValue = entry.metricValue || defaultValues.metricValue;
        const crownHtml = entry.showCrown ? `<p style="width:100%;position:absolute;top:-1.25rem;right:-2.25rem;transform:rotate(30deg);transform-origin:top right;font-size:3.25rem;text-align:right;margin:0;text-shadow:0px 10px 10px rgba(100,100,100,0.25);filter:saturate(1.1) contrast(1.2);">👑</p>` : '';
        const flagHtml = entry.flag ? `<p style="width:100%;position:absolute;top:-1.25rem;left:-2.25rem;font-size:2.5rem;text-align:left;margin:0;text-shadow:0px 10px 10px rgba(100,100,100,0.25);filter:saturate(1.1) contrast(1.2);">${entry.flag}</p>` : '';
  
        return `<div style="flex-grow:1;position:relative;width:65%;margin:auto;">${flagHtml}<img style="border-radius:10px;width:100%;filter:brightness(1.2) contrast(0.9) saturate(0);" src="${imageUrl}">${crownHtml}<p style="margin:0 0 0.85rem;color:hsl(20,73%,71%);">${name}</p><p style="width:max-content;font-size:1.15rem;font-weight:bold;text-align:center;margin:0 auto 0;padding:0.25rem 1rem;background:rgb(0,194,232);color:white;border-radius:5px;border-bottom:3px solid hsl(190deg 100% 37%);">${metricValue}</p></div>`;
      }).join('');
  
    return `<div style="background:white;color:black;position:relative;width:100%;min-width:30ch;margin:6rem auto 4rem;padding:1rem;border-radius:10px;box-shadow:0px 0px 30px -10px rgba(100,100,100,0.4);border-top:8px solid #00c2e8ff;border-bottom:8px solid #00c2e8ff;">
      <h2 style="margin:1rem 0 1rem;text-align:center;color:black;">KPI Shoutouts of the Week:</h2>
      <div style="text-align:center;margin-bottom:2rem;">
        <span style="display:inline-block;background:url(https://c4.wallpaperflare.com/wallpaper/521/996/856/light-decoration-stones-background-wallpaper-preview.jpg);background-size:contain;text-shadow:0px 0px 10px rgb(0 0 0);font-size:1.2rem;color:white;border-radius:5px;padding:0.8rem 1rem;margin:0 1ch;"><b>CSAT</b></span>
      </div>
      <p style="text-align:center;margin-bottom:4.5rem;">Let's see which superstars that have:<br><br><b>The highest percentage of positive conversation ratings!</b><br><br><br><span style="text-align:center;color:#aaa;"><i>(Based on a seven-day period from Monday to Monday and minimum 50 conversations on CS, 75 on PSR and 30 on Venue)</i></span></p>
      <div style="display:flex;flex-direction:row;align-items:start;padding-bottom:5rem;gap:3rem 0;flex-wrap:wrap;justify-content:space-evenly;">
        <div style="display:flex;flex-direction:column;justify-content:center;gap:3rem 0;min-width:22ch;max-width:25%;padding-bottom:2rem;background:hsl(20,75%,98%);border-radius:0 0 10px 10px;position:relative;z-index:2;">
          <h3 style="padding:0.5rem 0.75rem;background:rgb(250,113,46);border-radius:10px 10px 0 0;color:white;text-align:center;">Customer</h3>
          ${renderEntries(customerData)}
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center;gap:3rem 0;min-width:22ch;max-width:25%;padding-bottom:2rem;background:hsl(306,31%,98%);border-radius:0 0 10px 10px;position:relative;z-index:2;">
          <h3 style="padding:0.5rem 0.75rem;background:rgb(192,87,181);border-radius:10px 10px 0 0;color:white;text-align:center;">Courier</h3>
          ${renderEntries(courierData)}
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center;gap:3rem 0;min-width:22ch;max-width:25%;padding-bottom:2rem;background:hsl(108,22%,98%);border-radius:0 0 10px 10px;position:relative;z-index:2;">
          <h3 style="padding:0.5rem 0.75rem;background:rgb(100,184,80);border-radius:10px 10px 0 0;color:white;text-align:center;">Venue</h3>
          ${renderEntries(venueData)}
        </div>
      </div>
      <h3 style="text-align:center;margin-bottom:1rem;">WELL DONE ALL OF YOU! 👏🏻</h3>
      <img style="border-radius:10px;width:35%;display:block;margin:0 auto 1rem auto;" src="https://content.api.getguru.com/files/view/8329d0ef-5fc1-4c21-90cd-7c0833e48e80">
    </div>`;
  };
  

  useEffect(() => {
    setGeneratedHtml(generateHtmlTemplate());
  }, [customerData, courierData, venueData]);

  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml).then(
      () => alert('HTML code copied to clipboard!'),
      (err) => console.error('Failed to copy text: ', err)
    );
  };

  return (
    <div>
      <div className="flex-container">
        {renderFormSection('Customer', customerData, setCustomerData)}
        {renderFormSection('Courier', courierData, setCourierData)}
        {renderFormSection('Venue', venueData, setVenueData)}
      </div>
      <button className="generate-button" onClick={copyHtmlToClipboard}>Generate & Copy HTML</button>
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Live Preview</h2>
      <div className="live-preview" style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} dangerouslySetInnerHTML={{ __html: generatedHtml }} />
      <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #ddd' }}>
        <h2>License Agreement</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{licenseText}</pre>
      </div>
    </div>
  );
}

export default KpiInputForm;
