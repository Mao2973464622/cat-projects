// 全局商品列表
let goodsList = [];

// 1. 查：读取所有商品
function getGoods() {
  fetch('./goods.json')
    .then(res => res.json())
    .then(data => {
      goodsList = data;
      renderGoodsList(goodsList);
    })
    .catch(err => {
      console.log('读取数据失败', err);
      goodsList = [{id: 0, name: '暂无数据', category: '无', price: 0, experience: '', shortage: '', score: 0}];
      renderGoodsList(goodsList);
    });
}

// 2. 增：新增商品
function addGoods(formData) {
  if (!formData.name || !formData.price) {
    showToast('商品名和价格得填一下！');
    return;
  }

  fetch('./goods.json')
    .then(res => res.json())
    .then(oldData => {
      let newGoods = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: formData.price,
        img_url: formData.img_url || 'https://picsum.photos/id/96/400/300',
        buy_url: formData.buy_url || '#',
        experience: formData.experience,
        shortage: formData.shortage,
        score: formData.score,
        create_time: new Date().toLocaleDateString().replace(/\//g, '.')
      };
      oldData.push(newGoods);
      saveGoods(oldData);
      showToast('新增商品成功✨');
      setTimeout(() => window.location.href = 'list.html', 1500);
    })
    .catch(err => {
      console.log('新增失败', err);
      showToast('新增失败：未启动本地服务器');
    });
}

// 3. 改：编辑商品
function editGoods(formData, id) {
  if (!formData.name || !formData.price) {
    showToast('商品名和价格不能空！');
    return;
  }

  fetch('./goods.json')
    .then(res => res.json())
    .then(oldData => {
      let editIndex = oldData.findIndex(item => item.id == id);
      if (editIndex === -1) {
        showToast('商品不存在：纯前端受浏览器安全限制，无法直接修改本地goods.json');
        return;
      }

      oldData[editIndex] = {
        id: id,
        name: formData.name,
        category: formData.category,
        price: formData.price,
        img_url: formData.img_url || 'https://picsum.photos/id/96/400/300',
        buy_url: formData.buy_url || '#',
        experience: formData.experience,
        shortage: formData.shortage,
        score: formData.score,
        create_time: oldData[editIndex].create_time
      };

      saveGoods(oldData);
      showToast('修改成功✅');
      setTimeout(() => window.location.href = 'list.html', 1500);
    })
    .catch(err => {
      console.log('修改失败', err);
      showToast('修改失败：未启动本地服务器');
    });
}

// 4. 删：删除商品
function deleteGoods(id) {
  if (!confirm('确定要删吗？删了就找不回来了！')) {
    return;
  }

  fetch('./goods.json')
    .then(res => res.json())
    .then(oldData => {
      let newData = oldData.filter(item => item.id != id);
      saveGoods(newData);
      showToast('删除成功❌');
      setTimeout(() => getGoods(), 1000);
    })
    .catch(err => {
      console.log('删除失败', err);
      showToast('删除失败：未启动本地服务器');
    });
}

// 辅助：保存数据到JSON
function saveGoods(data) {
  fetch('./goods.json', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data, null, 2)
  }).catch(err => {
    console.log('保存数据失败', err);
    showToast('本地JSON写入失败，但演示效果正常～');
  });
}

// 辅助：渲染商品列表
function renderGoodsList(data) {
  let listBox = document.getElementById('goodsList');
  if (!listBox) return;

  listBox.innerHTML = '';
  if (data.length === 0) {
    listBox.innerHTML = '<p class="empty-tip">暂无商品数据～</p>';
    return;
  }

  data.forEach(item => {
    listBox.innerHTML += `
      <div class="goods-card">
        <img src="${item.img_url}" alt="${item.name}">
        <h5>${item.name}</h5>
        <p class="category">分类：${item.category}</p>
        <p class="price">¥${item.price}</p>
        <p>${item.experience.substring(0, 30)}${item.experience.length > 30 ? '...' : ''}</p>
        <p class="shortage">❌ 小缺点：${item.shortage.substring(0, 20)}${item.shortage.length > 20 ? '...' : ''}</p>
        <div class="card-actions">
          <a href="detail.html?id=${item.id}" class="btn btn-sm">详情</a>
          <a href="edit.html?id=${item.id}" class="btn btn-sm btn-secondary">编辑</a>
          <button onclick="deleteGoods(${item.id})" class="btn btn-sm btn-danger">删除</button>
        </div>
      </div>
    `;
  });
}

// 页面加载自动读取商品
window.onload = function() {
  if (window.location.pathname.includes('list.html')) {
    getGoods();
  }
};