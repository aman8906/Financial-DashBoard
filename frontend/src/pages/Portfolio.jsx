export default function Portfolio({ data }) {

  if (!data || data.length === 0) {
    return <p style={{ color: "#aaa" }}>Waiting for Excel data...</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        color: "black",
        borderCollapse: "collapse"
      }}
    >
      <thead>
        <tr>
          <th>Script</th>
          <th>Qty</th>
          <th>Buy Price</th>
          <th>Sell Price</th>
          <th>Net P&L</th>
        </tr>
      </thead>

      <tbody>
        {data.map((trade, index) => (
          <tr key={index}>
            <td>{trade.script}</td>
            <td>{trade.qty}</td>
            <td>{trade.buyPrice}</td>
            <td>{trade.sellPrice}</td>
            <td>{trade.netPNL}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
