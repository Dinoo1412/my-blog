### 基于范围的for循环(C++11)

for 语句允许简单的范围迭代：

```c++
int my_array[5] = {1, 2, 3, 4, 5};
// 每个数组元素乘于 2
for (int &x : my_array)
{
    x *= 2;
    cout << x << endl;  
}
// auto 类型也是 C++11 新标准中的，用来自动获取变量的类型
for (auto &x : my_array) {
    x *= 2;
    cout << x << endl;  
}
```

等同于：

```c++
include <iostream>

using namespace std;

int main ()
{
   // for 循环执行
   for( int a = 10; a < 20; a = a + 1 )
   {
       cout << "a 的值：" << a << endl;
   }

   return 0;
}
```

**`const auto &[k, v] : map`  循环哈希表**

```c++
for (const auto &[key, value] : 容器) {
    // 循环体
}
//map 是一个 std::unordered_map<int, int>，它的每个元素是一个 std::pair<const int, int>，即键值对。

const auto &[k, v] 表示：

	auto 自动推导元素类型。
	& 表示引用，避免拷贝。
	const 表示不允许通过引用修改元素（通常用于只读访问）。
	[k, v] 将 pair 的第一个成员（键）绑定到 k，第二个成员（值）绑定到 v。
	循环体内直接使用 k 和 v 代表当前元素的键和值，无需手动访问 .first 和 .second。

   //等同于
for (auto it = map.begin(); it != map.end(); ++it) {
    int k = it->first;   // 键
    int v = it->second;  // 值
    ans += v * (v - 1) / 2;
}
```

