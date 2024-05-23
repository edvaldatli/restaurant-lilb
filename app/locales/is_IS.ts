import is_IS from "date-fns/locale/is";

const Calendar = {
  sunday: "Sun",
  monday: "Mán",
  tuesday: "Þri",
  wednesday: "Mið",
  thursday: "Fim",
  friday: "Fös",
  saturday: "Lau",
  ok: "OK",
  today: "Í dag",
  yesterday: "Í gær",
  hours: "Klukkutímar",
  minutes: "Mínútur",
  seconds: "Sekúndur",
  formattedMonthPattern: "MMM yyyy",
  formattedDayPattern: "dd MMM yyyy",
  dateLocale: is_IS as any,
};

export default {
  Pagination: {
    more: "Meira",
    prev: "Fyrri",
    next: "Næsta",
    first: "Fyrsta",
    last: "Síðasta",
    limit: "{0} / síða",
    total: "Samtals raðir: {0}",
    skip: "Fara á{0}",
  },
  Table: {
    emptyMessage: "Engin gögn fundust",
    loading: "Hleður...",
  },
  TablePagination: {
    lengthMenuInfo: "{0} / síða",
    totalInfo: "Samtals: {0}",
  },
  Calendar,
  DatePicker: {
    ...Calendar,
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: "Síðustu 7 daga",
  },
  Picker: {
    noResultsText: "Engar niðurstöður fundust",
    placeholder: "Veldu",
    searchPlaceholder: "Leita",
    checkAll: "Velja allt",
  },
  InputPicker: {
    newItem: "Nýtt atriði",
    createOption: 'Búa til atriði "{0}"',
  },
  Uploader: {
    inited: "Hefja",
    progress: "Hleður upp",
    error: "Villa",
    complete: "Lokið",
    emptyFile: "Tómt",
    upload: "Hlaða upp",
    removeFile: "Eyða skrá",
  },
  CloseButton: {
    closeLabel: "Loka",
  },
  Breadcrumb: {
    expandText: "Sýna brauðmola",
  },
  Toggle: {
    on: "Opna",
    off: "Loka",
  },
};
