const operationsInfo = 
[  
  {
    id: 0,
    type: 'search',
    componentKey: 'listArea',
    requestApiAccessKeys: ['get0']
  },
  {
    id: 1,
    type: 'search',
    componentKey: 'listArea',
    requestApiAccessKeys: ['get1']
  },
  {
    id: 2,
    type: 'search',
    componentKey: 'listArea',
    requestApiAccessKeys: ['get2']
  },
  {
    id: 3,
    type: 'search',
    componentKey: 'listArea',
    requestApiAccessKeys: ['get3']
  },
  {
    id: 4,
    type: 'search',
    componentKey: 'listArea',
    requestApiAccessKeys: ['get4']
  },
  {
    id: 5,
    type: 'add',
    componentKey: 'formArea',
    sendApiAccessKeys: ['add0'],
    returnOperationId: 0,
    nextOperationId:  1
  },
  {
    id: 6,
    type: 'edit',
    componentKey: 'formArea',
    requestApiAccessKeys: ['get1'],
    sendApiAccessKeys: ['edit0'],
    returnOperationId: 1,
    nextOperationId:  1
  },
  {
    id: 7,
    type: 'remove',
    componentKey: 'formArea',
    requestApiAccessKeys: ['get1'],
    sendApiAccessKeys: ['remove0'],
    returnOperationId: 1,
    nextOperationId:  0
  },
  {
    id: 8,
    type: 'itemEdit',
    componentKey: 'itemEditArea',
    requestApiAccessKeys: ['get1', 'get4'],
    sendApiAccessKeys: ['add1', 'remove1'],
    returnOperationId: 1,
    nextOperationId:  0
  }
];


export default operationsInfo;