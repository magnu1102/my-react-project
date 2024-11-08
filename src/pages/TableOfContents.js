import React, { useState, useEffect } from 'react';

function TableOfContents() {
  const [categories, setCategories] = useState([]);
  const [generatedHtml, setGeneratedHtml] = useState('');

  const addCategory = () => {
    setCategories([...categories, { title: '', emoji: '', subcategories: [] }]);
  };

  const removeCategory = (categoryIndex) => {
    const updatedCategories = categories.filter((_, index) => index !== categoryIndex);
    setCategories(updatedCategories);
  };

  const addSubcategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subcategories.push({ title: '' });
    setCategories(updatedCategories);
  };

  const removeSubcategory = (categoryIndex, subcategoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subcategories = updatedCategories[categoryIndex].subcategories.filter(
      (_, index) => index !== subcategoryIndex
    );
    setCategories(updatedCategories);
  };

  const handleInputChange = (categoryIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex][field] = value;
    setCategories(updatedCategories);
  };

  const handleSubcategoryChange = (categoryIndex, subcategoryIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subcategories[subcategoryIndex].title = value;
    setCategories(updatedCategories);
  };

  const generateHtmlTemplate = () => {
    return `<div style="padding-bottom:2rem;">
      <h2 style="margin:1rem 0;">Table of Contents</h2>
      ${categories
        .map((category, i) => {
          const hasSubcategories = category.subcategories.length > 0;
          return `<details style="border-left:2px solid #9cc4cb8c;padding:1.25rem 0;">
            <summary style="list-style-type:none;display:flex;align-items:flex-end;cursor:pointer;">
              <span style="display:inline-block;height:2px;width:1.5rem;background:#9cc4cb8c;"></span>
              <span style="display:inline-block;position:relative;bottom:-1.2rem;">
                <span style="display:flex;height:2.4rem;background:rgb(35,155,221);box-shadow:0px 0px 10px -15px rgb(50 50 50 / 50%);border-radius:5px;cursor:pointer;text-decoration:none;line-height:calc(2.4rem - 8px);border-top:4px solid rgb(20 129 190 / 25%);border-bottom:4px solid rgb(19 127 187 / 90%);">
                  <div style="display:flex;align-items:center;padding:0 0.45rem;margin:0 0.2rem;font-size:0.95rem;border-radius:4px 0 0 4px;background:white;text-align:center;text-shadow:0px 0px 5px rgb(50 50 50 / 10%);box-shadow:0px 0px 5px rgb(50 50 50 / 15%);">${category.emoji || '❓'}</div>
                  <div style="padding:0 1rem 0 0.9rem;color:white;text-shadow:0px 0px 3px rgb(50 50 50 / 75%);font-weight:bold;">${category.title || 'Untitled'}
                    ${hasSubcategories ? '<span style="display:inline-block;line-height:normal;padding:0.15rem 0.3rem;margin-left:1.5ch;background:hsl(201deg 64% 65%);text-shadow:none;font-size:0.8rem;box-shadow:0px 0px 7px -3px rgb(100 50 50 / 50%);border-radius:5px;">⋱</span>' : ''}
                  </div>
                </span>
              </span>
            </summary>
            ${hasSubcategories ? `<div style="margin:0 0 2rem 4.5rem;padding-top:2.5rem;border-left:2px solid rgb(159 188 195 / 29%);">
              ${category.subcategories
                .map(
                  (subcategory) => `<div style="display:flex;align-items:flex-end;margin-bottom:1.75rem;">
                    <span style="display:inline-block;height:2px;width:2.5rem;background:rgb(159 188 195 / 29%);"></span>
                    <span style="display:inline-block;font-size:1rem;position:relative;bottom:-1rem;">
                      <a href="#${i + 1}-${subcategory.title.replace(/ /g, '-').toLowerCase()}" style="display:block;background:#fcffff;font-size:0.9rem;border:1px solid #708f9547;border-left:6px solid rgb(35,155,221);padding:0.5rem 0.7rem;color:rgb(45 114 151);border-radius:4px;cursor:pointer;text-decoration:none;">${subcategory.title || 'Untitled'}</a>
                    </span>
                  </div>`
                )
                .join('')}
            </div>` : ''}
          </details>`;
        })
        .join('')}
    </div>`;
  };

  useEffect(() => {
    setGeneratedHtml(generateHtmlTemplate());
  }, [categories]);

  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml).then(
      () => alert('HTML code copied to clipboard!'),
      (err) => console.error('Failed to copy text:', err)
    );
  };

  return (
    <div>
      <h1>Table of Contents Tool</h1>
      <button onClick={addCategory} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', background: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}>Add Category</button>
      <span style={{ marginLeft: '1rem', fontWeight: 'bold' }}>Total: {categories.length}</span>
      <hr style={{ margin: '1.5rem 0' }} />
      {categories.map((category, index) => (
        <div key={index} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Category {index + 1}</h3>
          <input
            type="text"
            placeholder="Title"
            value={category.title}
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            placeholder="Emoji"
            value={category.emoji}
            onChange={(e) => handleInputChange(index, 'emoji', e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button onClick={() => removeCategory(index)} style={{ marginBottom: '1rem', padding: '0.3rem 0.6rem', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px' }}>Remove Category</button>
          <h4>Subcategories</h4>
          <button onClick={() => addSubcategory(index)} style={{ marginBottom: '0.5rem', padding: '0.5rem 1rem', background: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}>Add Subcategory</button>
          {category.subcategories.map((subcategory, subIndex) => (
            <div key={subIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="text"
                placeholder="Subcategory Title"
                value={subcategory.title}
                onChange={(e) => handleSubcategoryChange(index, subIndex, e.target.value)}
                style={{ flex: '1', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd', marginRight: '0.5rem' }}
              />
              <button onClick={() => removeSubcategory(index, subIndex)} style={{ padding: '0.3rem 0.6rem', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px' }}>Remove</button>
            </div>
          ))}
        </div>
      ))}
      <button onClick={copyHtmlToClipboard} style={{ margin: '1rem auto', display: 'block', padding: '0.5rem 1rem', background: '#00c2e8', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '1rem' }}>Generate & Copy HTML</button>
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Live Preview</h2>
      <div className="live-preview" style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} dangerouslySetInnerHTML={{ __html: generatedHtml }} />
    </div>
  );
}

export default TableOfContents;
