import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Card, Button } from 'antd';

import './popup.less';

const App = () => {
  // const [loading, setLoading] = useState(true);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('active tabs', tabs);
  });

  return (
    <Card className="app">
      <Button type="primary">
        <a href="https://www.etsy.com/hk-en/your/purchases" target="_blank">打开订单页</a>
      </Button>
    </Card>
  );
};

render(<App />, document.getElementById('root'));
