import { Col, Row } from "antd";
import HelpCenterHeader from "../src/components/common/help-center-header";
import '../styles/global.css';

export default function App({ Component, pageProps }) {

  return (
    <div style={{ height: '100%' }}>
    <div style={{ background: '#525df9', marginBottom: '35px' }}>
        <Row style={{ justifyContent: 'center' }}>
            <Col span={16}>
                <HelpCenterHeader />
            </Col>
        </Row>
    </div>
    <div>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
            <Col span={16}>
                <Component {...pageProps} />
            </Col>
        </Row>
    </div>
</div>
  )
}
