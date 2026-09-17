import { Avatar, Button } from '@mui/material'
import '../css/header.css'
import { Input } from 'antd';
import logoImg from '../images/logo.png'
import textImg from '../images/text.png'
import type { GetProp, GetProps } from 'antd';
import { createStaticStyles } from 'antd-style';


const styles = createStaticStyles(({ css, cssVar }) => ({
    root: css`
    border-width: ${cssVar.lineWidth};
    border-radius: ${cssVar.borderRadius};
    transition: box-shadow ${cssVar.motionDurationMid};
    &:hover {
      border: 1px solid #d9d9d9;
    }
    &:focus-visible {
      border-color: lab(66.128% 0 0);
      box-shadow: 0 0 0 4px color-mix(in oklab, lab(66.128% 0 0) 50%, transparent);
    }
  `,
}));

const stylesFnSearch: SearchProps['styles'] = (info): GetProp<SearchProps, 'styles', 'Return'> => {
    if (info.props.size === 'large') {
        return {
            root: { color: '#4DA8DA', borderWidth: 0 },
            input: { color: '#4DA8DA', borderColor: '#4DA8DA' },
            prefix: { color: '#4DA8DA' },
            suffix: { color: '#4DA8DA' },
            count: { color: '#4DA8DA' },
            button: {
                root: { color: '#4DA8DA', borderColor: '#4DA8DA' },
                icon: { color: '#4DA8DA' },
            },
        };
    }
    return {};
};
type SearchProps = GetProps<typeof Input.Search>;


const { Search } = Input

function Header() {
    const classNames = styles;

    return (

        <div >
            <div style={{ justifyContent: 'space-between', display: 'flex', height: '70px' }}>
                <div className="left-navbar flex-row">
                    <img style={{ width: '80px', height: '60px' }} src={logoImg}></img><img style={{ width: '240px', height: '60px', marginTop: '5px' }} src={textImg}></img>
                </div>
                <div className="middle-navbar">
                    <Search
                        classNames={classNames}
                        styles={stylesFnSearch}
                        size="large"
                        placeholder="Search"
                        name="search-fn" />
                </div>
                <div className='right-navbar flex-row'>
                    <Button variant="contained" sx={{ marginTop: '6px' }} className='log-buttons'>Login</Button><Button variant="contained" className='log-buttons' sx={{ marginLeft: '8px', marginRight: '9px', marginTop: '6px' }}>Register</Button>
                    <Avatar alt='your profile' sx={{ bgcolor: 'deepskyblue', height: '50px', width: '50px', marginTop: '3px' }} >H</Avatar>
                </div>
            </div>
        </div >
    )
}

export default Header