import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';

export default function buildFontAwesomeLibrary() {
    library.add(
        faPlay,
        faList,
        faWrench,
        faPlus,
        faTimes,
        faSearch,
        faEye,
        faArrowRight,
        faArrowLeft,
        faTrashAlt
    );
}