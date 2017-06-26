var library = [
  { prof: 'Asaad Saad', course: 'WAP', courseID: 'CS452' },
  { prof: 'Rakesh Shrestha', course: 'WAA', courseID: 'CS545' },
  { prof: 'Steve Nolle', course: 'SWE', courseID: 'CS425' },
];

library.sort((a, b) => a.course < b.course ? -1 : a.course === b.course ? 0 : 1);

console.log(library);