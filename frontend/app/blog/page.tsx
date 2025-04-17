import React from 'react'

const Blog = () => {
  return (
    <main className="max-w-3xl container mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="space-y-6">
        <article>
          <h2 className="text-2xl font-semibold">Why choose our products?</h2>
          <p className="text-gray-600">
            Our products are carefully selected and tested for quality and
            performance. Learn more about how we pick the best for you.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Behind the scenes</h2>
          <p className="text-gray-600">
            Take a look at how our team works tirelessly to ensure you have a
            great experience shopping with us.
          </p>
        </article>
      </div>
    </main>
  );
}

export default Blog