import React from 'react';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import API from 'js/api';
import * as actionCreators from './actions';
import HSelect from 'components/HSelect';
import I18n from 'components/I18n';
import store from 'src/store';
import {getLang} from 'components/I18n/actions';
import {sStore} from 'js';

@autobind
export class Demo extends React.Component {
    state = {
        selectVal : '请选择语言'
    }
    componentWillMount() {
      API.GetYearDate({
          code: 'bitcoin',
          startTime: 1496651489384,
          endTime: 1528187468359
      },(res)=>{
          if(res.code==='0000'){
          }
      });
    }
    change(item){
        const {dispatch} = this.props;
        console.log(this.props)
        switch(item.value){
            case 'zh' :
                store.dispatch(getLang('zh'));
                this.setState({
                    selectVal : '中文'
                });
                sStore.set('lang','zh');
            break;
            case 'en' :
                store.dispatch(getLang('en'));
                this.setState({
                    selectVal : '英文'
                });
                sStore.set('lang','en');
            break;
            case 'fa' :
                store.dispatch(getLang('fa'));
                this.setState({
                    selectVal : '法语'
                });
                sStore.set('lang','fa');
            break;
            default :
                store.dispatch(getLang('en'))
                this.setState({
                    selectVal : '英文'
                });
                sStore.set('lang','en');
        }

    };
    render() {
        const {selectVal} = this.state;
        return <div className='demo'>
            <div>{this.props.row}</div>
            <div>{this.props.index}</div>
            <button onClick={()=>this.props.add(1)}>add</button>
            <button onClick={()=>this.props.mul(3)}>mul</button>
              <button><I18n message={'HELLO'}></I18n></button>
              <h4><I18n message={'SHIGE'}></I18n></h4>
              <HSelect
                        val={selectVal}
                        selectCb={this.change}
                        selectList={[{label:'中文',value:"zh"},{label:'英文',value:"en"},{label:'法语',value:'fa'}]}></HSelect>
          </div>
    }
}

const mapStateToProps = (state) => {
    return Object.assign(state.demoReducers.toJS(),state.I18nReducers.toJS());
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
