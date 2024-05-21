namespace System.Linq
{
    internal class SystemCore_EnumerableDebugView<T>
    {
        private Action flattenFields;

        public SystemCore_EnumerableDebugView(Action flattenFields)
        {
            this.flattenFields = flattenFields;
        }

        public object Items { get; internal set; }
    }
}