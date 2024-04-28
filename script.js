function calculateCosts() {
    const numStores = parseInt(document.getElementById('numStores').value);
    const wage = parseFloat(document.getElementById('wage').value);
    const time24 = parseFloat(document.getElementById('time24').value) / 3600;
    const setupTime20 = parseFloat(document.getElementById('setupTime20').value) / 3600; 
    const extraTime20 = parseFloat(document.getElementById('extraTime20').value) / 3600;
    const includeLoss = document.getElementById('includeLoss').checked;
    const solidUnits = parseInt(document.getElementById('solidUnits').value);
    const varietyUnits = parseInt(document.getElementById('varietyUnits').value);
    const linerCostPerBox = parseFloat(document.getElementById('linerCost').value);

    const totalCookies = solidUnits * 24 + varietyUnits * 24;
    const pans24 = totalCookies / 24;
    const pans20 = totalCookies / 20;

    const totalLaborCost24 = numStores * pans24 * time24 * wage * 365;
    const totalLaborCost20 = numStores * pans20 * (setupTime20 + extraTime20) * wage * 365;
    const potentialLossPerPan = 9.50;
    const potentialLoss24 = includeLoss ? numStores * pans24 * 0.01 * potentialLossPerPan * 365 : 0;

    const linersPerYear24 = numStores * pans24 * 365;
    const linersPerYear20 = numStores * pans20 * 365;
    const costPerLiner = linerCostPerBox / 1000;
    const linerCost24 = linersPerYear24 * costPerLiner;
    const linerCost20 = linersPerYear20 * costPerLiner;

    const totalCost24 = totalLaborCost24 + potentialLoss24 + linerCost24;
    const totalCost20 = totalLaborCost20 + linerCost20;
    const costDifference = totalCost24 - totalCost20;
    const color = costDifference > 0 ? 'red' : 'green';

    const results = document.getElementById('results');
    results.innerHTML = `
        <tr><td>Annual Labor Cost</td><td>$${totalLaborCost24.toLocaleString()}</td><td>$${totalLaborCost20.toLocaleString()}</td></tr>
        <tr><td>Potential Loss (if applied)</td><td>$${potentialLoss24.toLocaleString()}</td><td>$0.00</td></tr>
        <tr><td>Annual Liner Cost</td><td>$${linerCost24.toLocaleString()}</td><td>$${linerCost20.toLocaleString()}</td></tr>
        <tr><td>Total Annual Cost</td><td>$${totalCost24.toLocaleString()}</td><td>$${totalCost20.toLocaleString()}</td></tr>
        <tr><td>Net Savings</td><td colspan="2" style="text-align:center; color:${color};"><strong>$${Math.abs(costDifference).toLocaleString()}</strong> (${color === 'green' ? 'savings' : 'loss'})</td></tr>
    `;
}
