import React from 'react'
import { Card, Col } from 'antd'
import { Row, ScreenContainer, toYMDHMS } from "components/lib";
import styled from "@emotion/styled";
import { PreDayProps, TotalProps } from 'pages/home';
import { useCharAt } from 'utils';

type Props = {
    chinaAdd: Partial<PreDayProps> ;
    chinaTotal: Partial<TotalProps>;
};

const CardInfo : React.FC<Props> = ({chinaAdd, chinaTotal}) => {

    // const {chinaAdd, chinaTotal} = props
    // const [time, setTime] = useState(new Date())
    let time = new Date()

    return (
        <ScreenContainer>
            <Row marginBottom={2}>截止 {toYMDHMS(time)}</Row>
            <Row between={true} gap={2}>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}>
                    <Card style={{background:"#fffaf7"}}>
                        <PreStyle>
                            <span>较上日</span>
                            {
                                useCharAt(chinaAdd.localConfirmadd) === "-" ? <span style={{color:'#e57631'}}>{chinaAdd.localConfirmadd}</span>
                                                                           : <span style={{color:'#e57631'}}>+{chinaAdd.localConfirmadd}</span>
                            }
                            
                        </PreStyle>
                        <NumStyle style={{color:'#e57631'}}>{chinaTotal.localConfirm}</NumStyle>
                        <p>本土现有确诊</p>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}>
                    <Card style={{background:"#fff8f8"}}>
                        <PreStyle>
                            <span>较上日</span>
                            {
                                useCharAt(chinaAdd.nowConfirm) === "-" ? <span style={{color:'#e61c1d'}}>{chinaAdd.nowConfirm}</span>
                                                                      : <span style={{color:'#e61c1d'}}>+{chinaAdd.nowConfirm}</span>
                            }
                            
                        </PreStyle>
                        <NumStyle style={{color:'#e61c1d'}}>{chinaTotal.nowConfirm}</NumStyle>
                        <p>现有确诊</p>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}>
                    <Card style={{background:"#fff4f4"}} >
                        <PreStyle>
                            <span>较上日</span>
                            {
                                useCharAt(chinaAdd.confirm) === "-" ? <span style={{color:'#be2121'}}>{chinaAdd.confirm}</span>
                                                                   : <span style={{color:'#be2121'}}>+{chinaAdd.confirm}</span>
                            }
                            
                        </PreStyle>
                        <NumStyle style={{color:'#be2121'}}>{chinaTotal.confirm}</NumStyle>
                        <p>累计确诊</p>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}>
                    <Card  style={{background:"#fef7ff"}}>
                        <PreStyle>
                            <span>较上日</span>
                            {
                                useCharAt(chinaAdd.infect) === "-" ? <span style={{color:'#ae3ac6'}}>{chinaAdd.infect}</span>
                                                                  : <span style={{color:'#ae3ac6'}}>+{chinaAdd.infect}</span>
                            }
                        </PreStyle>
                        <NumStyle style={{color:'#ae3ac6'}}>{chinaTotal.noInfect}</NumStyle>
                        <p>无症状感染者</p>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}>
                    <Card style={{background:"#f1f5ff"}}>
                        <PreStyle>
                            <span>较上日</span>
                            {
                                useCharAt(chinaAdd.importedCase) === "-" ? <span style={{color:'#4e8be6'}}>{chinaAdd.importedCase}</span>
                                                                        : <span style={{color:'#4e8be6'}}>+{chinaAdd.importedCase}</span>
                            }
                            
                        </PreStyle>
                        <NumStyle style={{color:'#4e8be6'}}>{chinaTotal.importedCase}</NumStyle>
                        <p>境外输入</p>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}>
                    <Card style={{background:"#f3f6f8"}}>
                        <PreStyle>
                            <span>较上日</span>
                            {
                                useCharAt(chinaAdd.dead) === "-" ? <span style={{color:'#4e5a65'}}>{chinaAdd.dead}</span>
                                                                : <span style={{color:'#4e5a65'}}>+{chinaAdd.dead}</span>
                            }
                            
                        </PreStyle>
                        <NumStyle style={{color:'#4e5a65'}}>{chinaTotal.dead}</NumStyle>
                        <p>累计死亡</p>
                    </Card>
                </Col>
            </Row>
        </ScreenContainer>
    )
}
export default CardInfo

const PreStyle = styled.p`
    margin-top: 0;
    margin-bottom: 0;
    color:#7c7c7c;
`
const NumStyle = styled.p`
    margin-top: 0;
    margin-bottom: 0;
    font-size: 32px;
`
