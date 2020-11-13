import { ReactComponent as Idea } from '@cfpb/cfpb-icons/src/icons/idea.svg';
import { ReactComponent as Calendar } from '@cfpb/cfpb-icons/src/icons/calendar.svg';
import { ReactComponent as Add } from '@cfpb/cfpb-icons/src/icons/add.svg';
import { ReactComponent as Menu } from '@cfpb/cfpb-icons/src/icons/menu.svg';
import { ReactComponent as CloseRound } from '@cfpb/cfpb-icons/src/icons/close-round.svg';
import { ReactComponent as ArrowRight } from '@cfpb/cfpb-icons/src/icons/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '@cfpb/cfpb-icons/src/icons/arrow-left.svg';
import { ReactComponent as DownArrow } from '@cfpb/cfpb-icons/src/icons/arrow-down.svg';
import { ReactComponent as InformationRound } from '@cfpb/cfpb-icons/src/icons/information-round.svg';
import { ReactComponent as Pencil } from '@cfpb/cfpb-icons/src/icons/pencil.svg';
import { ReactComponent as Delete } from '@cfpb/cfpb-icons/src/icons/delete.svg';
import { ReactComponent as Hamburger } from '@cfpb/cfpb-icons/src/icons/hamburger.svg';
import ReactDOMServer from 'react-dom/server'

export const idea = ReactDOMServer.renderToString(Idea.render())
export const calendar = ReactDOMServer.renderToString(Calendar.render())
export const add = ReactDOMServer.renderToString(Add.render())
export const menu = ReactDOMServer.renderToString(Menu.render())
export const closeRound = ReactDOMServer.renderToString(CloseRound.render())
export const arrowRight = ReactDOMServer.renderToString(ArrowRight.render())
export const arrowLeft = ReactDOMServer.renderToString(ArrowLeft.render())
export const downArrow = ReactDOMServer.renderToString(DownArrow.render())
export const informationRound = ReactDOMServer.renderToString(InformationRound.render())
export const pencil = ReactDOMServer.renderToString(Pencil.render())
export const deleteIcon = ReactDOMServer.renderToString(Delete.render())
export const hamburger = ReactDOMServer.renderToString(Hamburger.render())