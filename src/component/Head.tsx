import { memo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MediaStyles } from "../common/config";
import { MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";

interface HeadProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const HeadToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ToolbarProps>(() => ({
  minHeight: '56px',
  display: 'flex',
  flexDirection: 'row',
  [MediaStyles.isPC]: {
    minHeight: '56px',
  },
}));

const LanguageSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'open',
})<SelectProps>(() => ({
  "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: 0
  },
  "&.MuiOutlinedInput-root .MuiSelect-icon": {
    color: 'inherit'
  },
}));

const LeftDiv = styled('div')({
  display: 'flex',
  flexGrow: 1,
  flexShrink: 0,
  alignItems: 'center',
});

const RightDiv = styled('div')({
  flexGrow: 0,
  flexShrink: 0,
  alignItems: 'center',
});

const Head = memo((props: HeadProps) => {
  const { open, handleDrawerOpen } = props;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const lang = event.target.value as string;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <HeadToolbar>
      <LeftDiv>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {t('title')}
        </Typography>
      </LeftDiv>
      <RightDiv>
        <LanguageSelect
          labelId="demo-select-small-label"
          id="demo-select-small"
          style={{color: 'inherit'}}
          value={language}
          label={t('lang.name')}
          onChange={handleChange}
          SelectDisplayProps={{style: {border: 0}}}
        >
          <MenuItem value={'zh'}>{t('lang.zh')}</MenuItem>
          <MenuItem value={'en'}>{t('lang.en')}</MenuItem>
        </LanguageSelect>
      </RightDiv>

    </HeadToolbar>
  );
});

Head.displayName = "Head";

export default Head;
