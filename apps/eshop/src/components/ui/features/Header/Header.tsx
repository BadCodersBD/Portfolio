import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavigationDrawer from "./NavigationMenu/NavigationDrawer";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import UserWidget from "./UserWidget/UserWidget";
import MenuIcon from "@mui/icons-material/Menu";
import {Styled} from "./Header.styled";
import { urlForThumbnail } from '../../../../utils/imageProcess'
import type { LogoPropsType } from '../../../../types/type'
import { fetchlogo } from "../../../../utils/fetchLogo"
import { GenericSpinner } from '../../element/GenericSpinner/GenericSpinner';


const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [Logos, setLogo] = useState<LogoPropsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const logo = await fetchlogo();
        setLogo(logo);
        setLoading(false);
      } catch (e) {
        console.log("Error", e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
       <div className="relative flex h-[90vh] items-center justify-center overflow-hidden">
          <GenericSpinner diameter={50} />
       </div>
    )
 }

  return (
    <Styled.Header>
      <div className="flex">
      {Logos.map((data, index) => (
        <div className="flex" key={index}>
          <Image
          src={urlForThumbnail(data.logoimage)}
          width={0}
          height={0}
          priority={true}
          sizes="100vw"
          style={{width: '100%', height: '100%'}}
          alt={data.logoname}
          className="hidden md:inline"
        />
        </div>
        ))}
        <button onClick={() => setOpen(!open)} className="inline lg:hidden">
          <div className="mr-4 text-black">
            <MenuIcon className="h-10 w-10" />
          </div>
          <NavigationDrawer open={open} />
        </button>
      </div>
      <NavigationMenu />
      <div className="flex">
        <UserWidget />
      </div>
    </Styled.Header>
  );
};

export default Header;
