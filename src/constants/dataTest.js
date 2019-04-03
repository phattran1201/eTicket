export const DATA_MILK_TEA = [
  {
    name: 'Trà sữa trân châu sợi',
    fill: '100% đường, 70% đá, Size L',
    sl: 12,
    price: 90000,
    image: 'http://tocotocotea.com/wp-content/uploads/2018/03/panda-1.jpg',
    total: 0
  },
  {
    name: 'Socola kem phô mai',
    fill: '30% đường, 70% đá, Size L, Trân châu viên, Trân châu sợi',
    sl: 1,
    price: 100000,
    image: 'http://tocotocotea.com/wp-content/uploads/2018/03/panda-1.jpg',
    total: 1
  },
  {
    name: 'Trà sữa bạc hà',
    fill: '70% đường, 70% đá, Size M',
    sl: 13,
    price: 90000,
    image: 'http://tocotocotea.com/wp-content/uploads/2018/03/panda-1.jpg',
    total: 2
  },
  {
    name: 'Hồng trà việt quất',
    fill: '70% đường, 70% đá, Size M, Trân châu viên, Size L, Trân châu viên',
    sl: 14,
    price: 90000,
    image: 'http://tocotocotea.com/wp-content/uploads/2018/03/panda-1.jpg',
    total: 3
  },
  {
    name: 'Trà sữa',
    fill: '70% đường, 70% đá, Size M, Trân châu sợi',
    sl: 1,
    price: 90000,
    image: 'http://tocotocotea.com/wp-content/uploads/2018/03/panda-1.jpg',
    total: 4
  }
];
export const DATA_SETTING = [
  {
    title: 'Location',
    icon: 'location-on',
    subtitle: 'Required to load your near by members',
    necessary: true
  },
  {
    title: 'Photo',
    icon: 'photo-library',
    subtitle: 'Required to register profile photo and send photo during chat',
    necessary: false
  },
  {
    title: 'Camera',
    icon: 'camera-alt',
    subtitle: 'Required to register profile photo and send photo during chat',
    necessary: true
  },
  {
    title: 'Microphone',
    icon: 'mic',
    subtitle: 'Required for voice recognition function and voice call during video call',
    necessary: true
  }
];

export const DATA_STORE = [
  {
    id: null,
    name: 'Bạn muốn đến cửa hàng nào ?'
  },
  {
    id: 0,
    name: 'TocoToco Ngô Thời Nhiệm',
    address: '87 Ngô Thời Nhiệm',
    district: 6,
    ward: 3,
    coordinate: {
      latitude: 10.784768,
      longitude: 106.6934272
    },
    backgroundImage: 'https://i-ngoisao.vnecdn.net/2015/09/28/25-9-201525-4708-1443401921.jpg',
    distance: 0.4
  },
  {
    id: 1,
    name: 'Trà Sữa TocoToco Cao Thắng',
    address: '58 Cao Thắng',
    district: 5,
    ward: 3,
    coordinate: {
      latitude: 10.7772204,
      longitude: 106.6934272
    },
    backgroundImage: 'http://channel.mediacdn.vn/prupload/879/2017/10/img20171017163151533.jpg',
    distance: 1.6
  },
  {
    id: 2,
    name: 'Trà Sữa TocoToco Nguyễn Tri Phương',
    address: '306 Nguyễn Tri Phương',
    district: 4,
    ward: 10,
    coordinate: {
      latitude: 10.762822,
      longitude: 106.66842
    },
    backgroundImage: 'http://channel.mediacdn.vn/prupload/164/2017/05/img20170514145331528.jpg',
    distance: 2.3
  },
  {
    id: 0,
    name: 'TocoToco Ngô Thời Nhiệm',
    address: '87 Ngô Thời Nhiệm',
    district: 6,
    ward: 3,
    coordinate: {
      latitude: 10.784768,
      longitude: 106.6934272
    },
    backgroundImage: 'http://channel.mediacdn.vn/prupload/164/2017/04/img20170424124840954.jpg',
    distance: 0.4
  },
  {
    id: 1,
    name: 'Trà Sữa TocoToco Cao Thắng',
    address: '58 Cao Thắng',
    district: 5,
    ward: 3,
    coordinate: {
      latitude: 10.7772204,
      longitude: 106.6934272
    },
    backgroundImage: 'https://storage.clingme.vn/dev4/0/000/376/0000376149.fid',
    distance: 1.6
  },
  {
    id: 2,
    name: 'Trà Sữa TocoToco Nguyễn Tri Phương',
    address: '306 Nguyễn Tri Phương',
    district: 4,
    ward: 10,
    coordinate: {
      latitude: 10.762822,
      longitude: 106.66842
    },
    backgroundImage:
      'data:image/jpeg;base64,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',
    distance: 2.3
  },
  {
    id: 0,
    name: 'TocoToco Ngô Thời Nhiệm',
    address: '87 Ngô Thời Nhiệm',
    district: 6,
    ward: 3,
    coordinate: {
      latitude: 10.784768,
      longitude: 106.6934272
    },
    backgroundImage:
      'https://storage.googleapis.com/senpoint-media-release/static/common/img/shop/96ac5c88fbeec8608b27ccbd62f28bfa.jpg',
    distance: 0.4
  },
  {
    id: 1,
    name: 'Trà Sữa TocoToco Cao Thắng',
    address: '58 Cao Thắng',
    district: 5,
    ward: 3,
    coordinate: {
      latitude: 10.7772204,
      longitude: 106.6934272
    },
    backgroundImage: 'https://lh5.googleusercontent.com/p/AF1QipNXV_MSB2uSL1ZusYN5Mf3CkrXOo47fuLqZYc1s=w90-h90-n-k-no',
    distance: 1.6
  },
  {
    id: 2,
    name: 'Trà Sữa TocoToco Nguyễn Tri Phương',
    address: '306 Nguyễn Tri Phương',
    district: 4,
    ward: 10,
    coordinate: {
      latitude: 10.762822,
      longitude: 106.66842
    },
    backgroundImage:
      'data:image/jpeg;base64,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',
    distance: 2.3
  }
];
export const DATA_TEST = [
  {
    id: '001',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'https://i-ngoisao.vnecdn.net/2015/09/28/25-9-201525-4708-1443401921.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt” ',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '002',
    name: 'Nguyễn Văn A',
    gender: 'male',
    age: 24,
    flag: 'korea',
    image: 'http://channel.mediacdn.vn/prupload/879/2017/10/img20171017163151533.jpg',
    topic: 'Săn lùng 8 cặp vé bay ngay Đà Lạt cùng trà sữa TocoToco',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '003',
    name: 'Nguyễn Thị B',
    gender: 'female',
    age: 18,
    flag: 'vietnam',
    image: 'http://channel.mediacdn.vn/prupload/164/2017/04/img20170424124840954.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam, Phu Nhuan, Ho Chi Minh, Viet Nam, Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '004',
    name: 'Trương Văn CX',
    gender: 'male',
    age: 40,
    flag: 'usa',
    image: 'http://channel.mediacdn.vn/prupload/164/2017/05/img20170514145331528.jpg',
    topic: 'Săn lùng 8 cặp vé bay ngay Đà Lạt cùng trà sữa TocoToco',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '005',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image:
      'https://storage.googleapis.com/senpoint-media-release/static/common/img/shop/96ac5c88fbeec8608b27ccbd62f28bfa.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '006',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'http://channel.mediacdn.vn/prupload/164/2017/05/img20170514145331528.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '007',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'http://channel.mediacdn.vn/prupload/879/2017/10/img20171017163151533.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '008',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'http://channel.mediacdn.vn/prupload/164/2017/05/img20170514145331528.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '009',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'http://channel.mediacdn.vn/prupload/879/2017/10/img20171017163151533.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '010',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'https://storage.clingme.vn/dev4/0/000/376/0000376149.fid',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  },
  {
    id: '010',
    name: 'Panda Fonnapha',
    gender: 'male',
    age: 20,
    flag: 'vietnam',
    image: 'http://channel.mediacdn.vn/prupload/164/2017/04/img20170424124840954.jpg',
    topic: 'Lộ diện những chủ nhân đầu tiên trong “Cào nhanh tay – Bay ngay Đà Lạt”',
    rating: 3,
    location: 'Phu Nhuan, Ho Chi Minh, Viet Nam',
    date: '20/11/2019 9:20AM',
    note:
      'Bật mí phương pháp làm đẹp từ “thần dược” tự nhiên mang tên Dâu tằm Không chỉ là một loại quả để giải khát, những trái dâu tằm chín mọng còn là tiên dược được chị em săn đón rất nhiều đấy nhé! Trắng da giảm mụn nhanh chóng Trong trái dâu tằm có chứa chất alpha – hydroxy axit giúp loại bỏ hiệu quả tế bào chết, đem lại cho bạn làn da trắng hồng. Đặc biệt, dâu tằm còn chứa các khoáng chất có khả năng ngăn ngừa mụn hiệu quả. Sử dụng trái dâu tằm hoặc các sản phẩm từ dâu tằm trong một thời gian dài sẽ giúp da của bạn trắng bật tone, sớm sở hữu một làn da căng bóng, láng mịn. Tóc đen óng ả, không lo bạc sớm Bật mí ngay cho bạn công thức chống tóc khô gãy, nhanh rụng, chóng bạc. Cách thực hiện rất đơn giản. Chuẩn bị quả dâu tằm 1 kilogam, rượu 0,5 lít. Trái dâu tằm mang rửa sạch, để ráo nước cho vào bình. Tiếp theo đổ rượu vào bình và ngâm trong 3 ngày. Uống ngày 2 lần vào 2 bữa cơm, mỗi lần khoảng 20ml.'
  }
];
export const DATA_CATEGORY = [
  'Món nổi bật',
  'Món yêu thích',
  'Handmade',
  'Special drink',
  'MachiatoCream Cheese',
  'Chè',
  'Đồ uống khác'
];
