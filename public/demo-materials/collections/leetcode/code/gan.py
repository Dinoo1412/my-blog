import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Input, Dense, LeakyReLU, Reshape, Conv2DTranspose, Conv2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import plot_model

# ----------------------
# 1. 初始化参数
# ----------------------
latent_dim = 100  # 噪声向量维度
img_shape = (28, 28, 1)  # MNIST图像尺寸（28x28，单通道）
epochs = 20000  # 训练轮次
batch_size = 64  # 批次大小
sample_interval = 1000  # 每1000轮保存一次生成的图像

# ----------------------
# 2. 构建判别器（区分真假图像）
# ----------------------
def build_discriminator():
    model = Sequential(name="Discriminator")
    # 输入：(28,28,1)，输出：(14,14,64)
    model.add(Conv2D(64, (3, 3), strides=(2, 2), padding="same", input_shape=img_shape))
    model.add(LeakyReLU(alpha=0.2))  # 防止梯度消失
    # 输出：(7,7,128)
    model.add(Conv2D(128, (3, 3), strides=(2, 2), padding="same"))
    model.add(LeakyReLU(alpha=0.2))
    # 展平：7*7*128 = 6272
    model.add(Reshape((-1,)))
    # 全连接层：输出1个概率值（0=假，1=真）
    model.add(Dense(1, activation="sigmoid"))
    
    # 编译判别器
    model.compile(loss="binary_crossentropy", optimizer=Adam(0.0002, 0.5), metrics=["accuracy"])
    return model

# ----------------------
# 3. 构建生成器（从噪声生成假图像）
# ----------------------
def build_generator():
    model = Sequential(name="Generator")
    # 输入：噪声向量(100,)，输出：(7*7*128,) = 6272
    model.add(Dense(7 * 7 * 128, input_dim=latent_dim))
    model.add(LeakyReLU(alpha=0.2))
    # reshape为(7,7,128)
    model.add(Reshape((7, 7, 128)))
    # 转置卷积：输出(14,14,64)
    model.add(Conv2DTranspose(64, (3, 3), strides=(2, 2), padding="same"))
    model.add(LeakyReLU(alpha=0.2))
    # 转置卷积：输出(28,28,1)（最终图像尺寸）
    model.add(Conv2DTranspose(1, (3, 3), strides=(2, 2), padding="same", activation="tanh"))
    
    return model

# ----------------------
# 4. 构建GAN（组合生成器+判别器）
# ----------------------
def build_gan(generator, discriminator):
    # 训练生成器时，冻结判别器（不更新判别器参数）
    discriminator.trainable = False
    
    # GAN输入：噪声向量
    noise_input = Input(shape=(latent_dim,))
    # GAN输出：生成器生成的假图像，经过判别器的预测
    fake_img = generator(noise_input)
    gan_output = discriminator(fake_img)
    
    # 编译GAN（只训练生成器）
    model = Model(noise_input, gan_output, name="GAN")
    model.compile(loss="binary_crossentropy", optimizer=Adam(0.0002, 0.5))
    return model

# ----------------------
# 5. 加载数据并预处理
# ----------------------
(x_train, _), (_, _) = mnist.load_data()
# 归一化：把像素值从[0,255]转成[-1,1]（适配生成器的tanh激活）
x_train = x_train / 127.5 - 1.0
# 增加通道维度：(60000,28,28) → (60000,28,28,1)
x_train = np.expand_dims(x_train, axis=-1)
# 生成真实标签（1）和假标签（0）
real_labels = np.ones((batch_size, 1))
fake_labels = np.zeros((batch_size, 1))

# ----------------------
# 6. 初始化模型并训练
# ----------------------
# 实例化模型
discriminator = build_discriminator()
generator = build_generator()
gan = build_gan(generator, discriminator)

# 打印模型结构（可选）
print("判别器结构：")
discriminator.summary()
print("\n生成器结构：")
generator.summary()

# 开始训练
for epoch in range(epochs):
    # ----------------------
    # 步骤1：训练判别器（先训鉴假师）
    # ----------------------
    # 1.1 用真实图像训练判别器
    idx = np.random.randint(0, x_train.shape[0], batch_size)  # 随机选batch_size个真实图像
    real_imgs = x_train[idx]
    d_loss_real, d_acc_real = discriminator.train_on_batch(real_imgs, real_labels)
    
    # 1.2 用生成器的假图像训练判别器
    noise = np.random.normal(0, 1, (batch_size, latent_dim))  # 生成随机噪声
    fake_imgs = generator.predict(noise, verbose=0)  # 生成假图像
    d_loss_fake, d_acc_fake = discriminator.train_on_batch(fake_imgs, fake_labels)
    
    # 计算判别器的平均损失和准确率
    d_loss = 0.5 * (d_loss_real + d_loss_fake)
    d_acc = 0.5 * (d_acc_real + d_acc_fake)
    
    # ----------------------
    # 步骤2：训练生成器（再训造假者）
    # ----------------------
    noise = np.random.normal(0, 1, (batch_size, latent_dim))
    # 目标：让判别器把假图像判断为“真”（标签用1）
    g_loss = gan.train_on_batch(noise, real_labels)
    
    # ----------------------
    # 步骤3：打印日志+保存图像
    # ----------------------
    if epoch % 100 == 0:
        print(f"Epoch [{epoch}/{epochs}] | D_loss: {d_loss:.4f} | D_acc: {d_acc:.4f} | G_loss: {g_loss:.4f}")
    
    # 每sample_interval轮，保存生成的图像
    if epoch % sample_interval == 0:
        # 生成25张假图像（5x5网格）
        sample_noise = np.random.normal(0, 1, (25, latent_dim))
        sample_imgs = generator.predict(sample_noise, verbose=0)
        # 反归一化：从[-1,1]转回[0,1]（方便显示）
        sample_imgs = 0.5 * sample_imgs + 0.5
        
        # 绘制图像
        fig, axs = plt.subplots(5, 5, figsize=(10, 10))
        cnt = 0
        for i in range(5):
            for j in range(5):
                axs[i, j].imshow(sample_imgs[cnt, :, :, 0], cmap="gray")
                axs[i, j].axis("off")  # 隐藏坐标轴
                cnt += 1
        # 保存图像（可自行修改路径）
        fig.savefig(f"gan_mnist_epoch_{epoch}.png")
        plt.close()

print("训练完成！生成的图像已保存为 gan_mnist_epoch_xxx.png")